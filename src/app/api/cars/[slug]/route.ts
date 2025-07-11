import { Status } from "@/lib/car";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    console.log("11111111111111");
    const { slug } = await params;
    const { name, price, status } = await request.json();

    console.log(name);
    console.log(price);
    console.log(status);
    if (!name || !price) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    if (
        status &&
        ![Status.Pending, Status.Approved, Status.Rejected].includes(status)
    ) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const car = await prisma.car.update({
        where: {
            id: slug,
        },
        data: {
            name: name,
            price: parseInt(price),
            status: status,
        },
    });
    // console.log("car api",car)
    return NextResponse.json({ message: "Car updated" });
}
