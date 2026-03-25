import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        const data = await request.json();

        // Validate payload
        const requiredFields = ['participant_id', 'condition', 'decision', 'timestamp', 'latency_ms'];
        for (const field of requiredFields) {
            if (!(field in data)) {
                return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
            }
        }

        // Save to JSON
        const jsonPath = path.join(process.cwd(), 'logs.json');
        let logs = [];
        if (fs.existsSync(jsonPath)) {
            const fileContent = fs.readFileSync(jsonPath, 'utf-8');
            logs = fileContent ? JSON.parse(fileContent) : [];
        }
        logs.push(data);
        fs.writeFileSync(jsonPath, JSON.stringify(logs, null, 2));

        // Save to CSV
        const csvPath = path.join(process.cwd(), 'logs.csv');
        const headers = requiredFields.join(',');
        const row = requiredFields.map(field => {
            const value = data[field];
            // Basic CSV escaping if string contains commas
            if (typeof value === 'string' && value.includes(',')) {
                return `"${value}"`;
            }
            return value;
        }).join(',');

        if (!fs.existsSync(csvPath)) {
            fs.writeFileSync(csvPath, headers + '\n' + row + '\n');
        } else {
            fs.appendFileSync(csvPath, row + '\n');
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to parse log request", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
