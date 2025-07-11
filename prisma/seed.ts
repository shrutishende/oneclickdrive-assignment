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
                {
                    name: "Toyota Camry",
                    price: 200,
                    status: "pending",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Honda Accord",
                    price: 400,
                    status: "approved",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Ford Mustang",
                    price: 500,
                    status: "rejected",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Chevrolet Malibu",
                    price: 300,
                    status: "pending",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Nissan Altima",
                    price: 600,
                    status: "approved",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "BMW X5",
                    price: 250,
                    status: "rejected",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Audi A4",
                    price: 450,
                    status: "pending",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Mercedes C-Class",
                    price: 700,
                    status: "approved",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Hyundai Sonata",
                    price: 320,
                    status: "rejected",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Kia Optima",
                    price: 510,
                    status: "pending",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Volkswagen Passat",
                    price: 280,
                    status: "approved",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Subaru Outback",
                    price: 650,
                    status: "rejected",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Mazda CX-5",
                    price: 430,
                    status: "pending",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Lexus ES",
                    price: 390,
                    status: "approved",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Jeep Cherokee",
                    price: 520,
                    status: "rejected",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Tesla Model 3",
                    price: 270,
                    status: "pending",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Porsche Cayenne",
                    price: 480,
                    status: "approved",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Volvo XC90",
                    price: 610,
                    status: "pending",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Infiniti Q50",
                    price: 350,
                    status: "rejected",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Acura TLX",
                    price: 530,
                    status: "approved",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Cadillac CT5",
                    price: 290,
                    status: "pending",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Lincoln MKZ",
                    price: 420,
                    status: "rejected",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Chrysler 300",
                    price: 670,
                    status: "approved",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Buick Enclave",
                    price: 310,
                    status: "pending",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "GMC Acadia",
                    price: 490,
                    status: "rejected",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Ram 1500",
                    price: 560,
                    status: "approved",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Ford F-150",
                    price: 380,
                    status: "pending",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Chevrolet Silverado",
                    price: 640,
                    status: "rejected",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Toyota Tacoma",
                    price: 330,
                    status: "approved",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Nissan Frontier",
                    price: 470,
                    status: "pending",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Honda Ridgeline",
                    price: 590,
                    status: "rejected",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Jeep Wrangler",
                    price: 260,
                    status: "approved",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Toyota RAV4",
                    price: 410,
                    status: "pending",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Honda CR-V",
                    price: 680,
                    status: "rejected",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Ford Escape",
                    price: 340,
                    status: "approved",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Chevrolet Equinox",
                    price: 500,
                    status: "pending",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Nissan Rogue",
                    price: 620,
                    status: "rejected",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Hyundai Tucson",
                    price: 360,
                    status: "approved",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Kia Sportage",
                    price: 540,
                    status: "pending",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Subaru Forester",
                    price: 290,
                    status: "rejected",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Mazda CX-30",
                    price: 460,
                    status: "approved",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Volkswagen Tiguan",
                    price: 630,
                    status: "pending",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Audi Q5",
                    price: 370,
                    status: "rejected",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "BMW X3",
                    price: 550,
                    status: "approved",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Mercedes GLC",
                    price: 300,
                    status: "pending",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Lexus NX",
                    price: 480,
                    status: "rejected",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Porsche Macan",
                    price: 660,
                    status: "approved",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Volvo XC60",
                    price: 320,
                    status: "pending",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Infiniti QX50",
                    price: 510,
                    status: "rejected",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Acura RDX",
                    price: 590,
                    status: "approved",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Cadillac XT5",
                    price: 270,
                    status: "pending",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Lincoln Nautilus",
                    price: 430,
                    status: "rejected",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Chrysler Pacifica",
                    price: 610,
                    status: "approved",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Buick Encore",
                    price: 350,
                    status: "pending",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "GMC Terrain",
                    price: 520,
                    status: "rejected",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Ram 2500",
                    price: 680,
                    status: "approved",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Ford Ranger",
                    price: 310,
                    status: "pending",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Chevrolet Colorado",
                    price: 470,
                    status: "rejected",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Toyota Highlander",
                    price: 640,
                    status: "approved",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Honda Pilot",
                    price: 330,
                    status: "pending",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Ford Explorer",
                    price: 490,
                    status: "rejected",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Nissan Pathfinder",
                    price: 560,
                    status: "approved",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Hyundai Santa Fe",
                    price: 380,
                    status: "pending",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Kia Telluride",
                    price: 650,
                    status: "rejected",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Subaru Ascent",
                    price: 290,
                    status: "approved",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Mazda CX-9",
                    price: 420,
                    status: "pending",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Volkswagen Atlas",
                    price: 600,
                    status: "rejected",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Audi Q7",
                    price: 340,
                    status: "approved",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "BMW X7",
                    price: 510,
                    status: "pending",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Mercedes GLE",
                    price: 670,
                    status: "rejected",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Lexus RX",
                    price: 360,
                    status: "approved",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Porsche 911",
                    price: 530,
                    status: "pending",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Volvo XC40",
                    price: 280,
                    status: "rejected",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Infiniti QX60",
                    price: 460,
                    status: "approved",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Acura MDX",
                    price: 620,
                    status: "pending",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Cadillac Escalade",
                    price: 370,
                    status: "rejected",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Lincoln Navigator",
                    price: 550,
                    status: "approved",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Chrysler Voyager",
                    price: 300,
                    status: "pending",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Buick Envision",
                    price: 480,
                    status: "rejected",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "GMC Yukon",
                    price: 660,
                    status: "approved",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Ram 3500",
                    price: 320,
                    status: "pending",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Ford Bronco",
                    price: 510,
                    status: "rejected",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Chevrolet Tahoe",
                    price: 590,
                    status: "approved",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Toyota 4Runner",
                    price: 270,
                    status: "pending",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Nissan Armada",
                    price: 430,
                    status: "rejected",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Hyundai Palisade",
                    price: 610,
                    status: "approved",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Kia Sorento",
                    price: 350,
                    status: "pending",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Subaru Crosstrek",
                    price: 520,
                    status: "rejected",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Mazda CX-50",
                    price: 680,
                    status: "approved",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Volkswagen ID.4",
                    price: 310,
                    status: "pending",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Audi Q3",
                    price: 470,
                    status: "rejected",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "BMW X1",
                    price: 640,
                    status: "approved",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Mercedes GLA",
                    price: 330,
                    status: "pending",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Lexus UX",
                    price: 490,
                    status: "rejected",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Porsche Panamera",
                    price: 560,
                    status: "approved",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Volvo S60",
                    price: 380,
                    status: "pending",
                    image_url: "/image/cars/car-4.jpg",
                },
                {
                    name: "Infiniti QX80",
                    price: 650,
                    status: "rejected",
                    image_url: "/image/cars/car-1.jpg",
                },
                {
                    name: "Acura ILX",
                    price: 290,
                    status: "approved",
                    image_url: "/image/cars/car-2.jpg",
                },
                {
                    name: "Cadillac CT4",
                    price: 420,
                    status: "pending",
                    image_url: "/image/cars/car-3.jpg",
                },
                {
                    name: "Lincoln Corsair",
                    price: 600,
                    status: "rejected",
                    image_url: "/image/cars/car-4.jpg",
                },
            ],
        });
    }
};

seed();
