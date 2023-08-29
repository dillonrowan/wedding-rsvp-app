import { NextResponse } from 'next/server';
 
export async function POST(request) {
    console.log('INSIDE POST ROUTE');
    console.log(request);
    return NextResponse.json({
        'THIS IS RESPSONSE': "@@@@@@@@@@@@@@@@@@@@@@@@@@@"
    })
}