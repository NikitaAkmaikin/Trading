import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    // Читаем файл с mock данными
    const filePath = path.join(process.cwd(), 'data', 'mock-tickets.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const mockTickets = JSON.parse(fileContents);
    
    return NextResponse.json({
      success: true,
      data: mockTickets
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