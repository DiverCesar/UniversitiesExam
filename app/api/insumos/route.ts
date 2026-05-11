import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function GET() {
    try {
        const universities = await prisma.university.findMany({ orderBy: { national_ranking: 'desc' } });
        return NextResponse.json(universities);
    } catch (error: any) {
        console.error("GET Error:", error);
        return NextResponse.json({ message: "Error en GET", error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const nuevo = await prisma.university.create({
            data: {
                university_name: body.university_name,
                rector_name: body.rector_name,
                foundation_year: Number(body.foundation_year),
                university_type: body.university_type,
                total_degree_courses: Number(body.total_degree_courses),
                mission: body.mission || 'Mission: ',
                vision: body.vision || 'Vision: ',
                national_ranking: Number(body.national_ranking) || 0
            }
        });
        return NextResponse.json(nuevo);
    } catch (error: any) {
        console.error("POST Error:", error);
        return NextResponse.json({ message: "Error en POST", error: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const actualizado = await prisma.university.update({
            where: { university_id: body.university_id },
            data: {
                university_name: body.university_name,
                rector_name: body.rector_name,
                foundation_year: Number(body.foundation_year),
                university_type: body.university_type,
                total_degree_courses: Number(body.total_degree_courses),
                mission: body.mission,
                vision: body.vision,
                national_ranking: Number(body.national_ranking) || 0
            }
        });
        return NextResponse.json(actualizado);
    } catch (error: any) {
        console.error("PUT Error:", error);
        return NextResponse.json({ message: "Error en PUT", error: error.message }, { status: 500 });
    }
}