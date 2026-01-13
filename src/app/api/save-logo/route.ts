
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const { image } = await request.json();

        // Remove header
        const base64Data = image.replace(/^data:image\/png;base64,/, "");

        const filePath = path.join(process.cwd(), 'public', 'logo_transparent.png');

        fs.writeFileSync(filePath, base64Data, 'base64');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Save error:', error);
        return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
    }
}
