import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    // Читаем файл с mock данными
    const filePath = path.join(process.cwd(), 'data', 'mock-orders.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const mockOrders = JSON.parse(fileContents);

    // Получаем query параметр status из URL
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status');

    // Если параметр status не указан, возвращаем все заказы
    if (!statusFilter) {
      return NextResponse.json({
        success: true,
        count: mockOrders.length,
        data: mockOrders
      });
    }

    // Фильтруем заказы по статусу
    const filteredOrders = mockOrders.filter(
      order => order.status === statusFilter.toUpperCase()
    );

    return NextResponse.json({
      success: true,
      count: filteredOrders.length,
      filter: statusFilter.toUpperCase(),
      data: filteredOrders
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: error.message
      },
      { status: 500 }
    );
  }
}