import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

const initialCars = [{ name: "Car 1" }, { name: "Car 2" }, { name: "Car 3" }];

const seed = async () => {
    // clean up before the seeding (optional)
    await prisma.car.deleteMany();

    // you could also use createMany
    // but it is not supported for databases
    // e.g. SQLite https://github.com/prisma/prisma/issues/10710
    //     for (const car of initialCars) {
    //         await prisma.car.create({
    //             data: car
    //         });
    //     }

    const carCount = await prisma.car.count();

    if (carCount === 0) {
        await prisma.car.createMany({
            data: [
                { name: "car 1", price: 200, status: "pending" },
                { name: "car 2", price: 400, status: "approved" },
                { name: "car 3", price: 500, status: "rejected" },
                { name: "car 4", price: 300, status: "pending" },
                { name: "car 5", price: 600, status: "approved" },
                { name: "car 6", price: 250, status: "rejected" },
                { name: "car 7", price: 450, status: "pending" },
                { name: "car 8", price: 700, status: "approved" },
                { name: "car 9", price: 320, status: "rejected" },
                { name: "car 10", price: 510, status: "pending" },
                { name: "car 11", price: 280, status: "approved" },
                { name: "car 12", price: 650, status: "rejected" },
                { name: "car 13", price: 430, status: "pending" },
                { name: "car 14", price: 390, status: "approved" },
                { name: "car 15", price: 520, status: "rejected" },
                { name: "car 16", price: 270, status: "pending" },
                { name: "car 17", price: 480, status: "approved" },
                { name: "car 18", price: 610, status: "pending" },
                { name: "car 19", price: 350, status: "rejected" },
                { name: "car 20", price: 530, status: "approved" },
                { name: "car 21", price: 290, status: "pending" },
                { name: "car 22", price: 420, status: "rejected" },
                { name: "car 23", price: 670, status: "approved" },
                { name: "car 24", price: 310, status: "pending" },
                { name: "car 25", price: 490, status: "rejected" },
                { name: "car 26", price: 560, status: "approved" },
                { name: "car 27", price: 380, status: "pending" },
                { name: "car 28", price: 640, status: "rejected" },
                { name: "car 29", price: 330, status: "approved" },
                { name: "car 30", price: 470, status: "pending" },
                { name: "car 31", price: 590, status: "rejected" },
                { name: "car 32", price: 260, status: "approved" },
                { name: "car 33", price: 410, status: "pending" },
                { name: "car 34", price: 680, status: "rejected" },
                { name: "car 35", price: 340, status: "approved" },
                { name: "car 36", price: 500, status: "pending" },
                { name: "car 37", price: 620, status: "rejected" },
                { name: "car 38", price: 360, status: "approved" },
                { name: "car 39", price: 540, status: "pending" },
                { name: "car 40", price: 290, status: "rejected" },
                { name: "car 41", price: 460, status: "approved" },
                { name: "car 42", price: 630, status: "pending" },
                { name: "car 43", price: 370, status: "rejected" },
                { name: "car 44", price: 550, status: "approved" },
                { name: "car 45", price: 300, status: "pending" },
                { name: "car 46", price: 480, status: "rejected" },
                { name: "car 47", price: 660, status: "approved" },
                { name: "car 48", price: 320, status: "pending" },
                { name: "car 49", price: 510, status: "rejected" },
                { name: "car 50", price: 590, status: "approved" },
                { name: "car 51", price: 270, status: "pending" },
                { name: "car 52", price: 430, status: "rejected" },
                { name: "car 53", price: 610, status: "approved" },
                { name: "car 54", price: 350, status: "pending" },
                { name: "car 55", price: 520, status: "rejected" },
                { name: "car 56", price: 680, status: "approved" },
                { name: "car 57", price: 310, status: "pending" },
                { name: "car 58", price: 470, status: "rejected" },
                { name: "car 59", price: 640, status: "approved" },
                { name: "car 60", price: 330, status: "pending" },
                { name: "car 61", price: 490, status: "rejected" },
                { name: "car 62", price: 560, status: "approved" },
                { name: "car 63", price: 380, status: "pending" },
                { name: "car 64", price: 650, status: "rejected" },
                { name: "car 65", price: 290, status: "approved" },
                { name: "car 66", price: 420, status: "pending" },
                { name: "car 67", price: 600, status: "rejected" },
                { name: "car 68", price: 340, status: "approved" },
                { name: "car 69", price: 510, status: "pending" },
                { name: "car 70", price: 670, status: "rejected" },
                { name: "car 71", price: 360, status: "approved" },
                { name: "car 72", price: 530, status: "pending" },
                { name: "car 73", price: 280, status: "rejected" },
                { name: "car 74", price: 460, status: "approved" },
                { name: "car 75", price: 620, status: "pending" },
                { name: "car 76", price: 370, status: "rejected" },
                { name: "car 77", price: 550, status: "approved" },
                { name: "car 78", price: 300, status: "pending" },
                { name: "car 79", price: 480, status: "rejected" },
                { name: "car 80", price: 660, status: "approved" },
                { name: "car 81", price: 320, status: "pending" },
                { name: "car 82", price: 510, status: "rejected" },
                { name: "car 83", price: 590, status: "approved" },
                { name: "car 84", price: 270, status: "pending" },
                { name: "car 85", price: 430, status: "rejected" },
                { name: "car 86", price: 610, status: "approved" },
                { name: "car 87", price: 350, status: "pending" },
                { name: "car 88", price: 520, status: "rejected" },
                { name: "car 89", price: 680, status: "approved" },
                { name: "car 90", price: 310, status: "pending" },
                { name: "car 91", price: 470, status: "rejected" },
                { name: "car 92", price: 640, status: "approved" },
                { name: "car 93", price: 330, status: "pending" },
                { name: "car 94", price: 490, status: "rejected" },
                { name: "car 95", price: 560, status: "approved" },
                { name: "car 96", price: 380, status: "pending" },
                { name: "car 97", price: 650, status: "rejected" },
                { name: "car 98", price: 290, status: "approved" },
                { name: "car 99", price: 420, status: "pending" },
                { name: "car 100", price: 600, status: "rejected" },
            ],
        });
    }
};

seed();
