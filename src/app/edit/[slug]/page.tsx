import EditForm from "@/app/components/EditForm";
import { prisma } from "@/lib/prisma";
import React from "react";

async function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const car = await prisma.car.findUnique({
        where: {
            id: slug,
        },
    });

   // console.log(car)

    if (!car) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-red-500 text-lg">Car not found</p>
            </div>
        );
    }

    return <EditForm car={car} />;
}

export default page;
