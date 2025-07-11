import { prisma } from "@/lib/prisma";
import Header from "./components/Header";
import CarList from "./components/CarList";

export default async function Home({
    searchParams,
}: {
    searchParams: { page?: string; status?: string };
}) {
    const page = await parseInt(searchParams.page || "1", 10);
   // const status = await searchParams.status
   // console.log("status",status)
    const limit = 10;

    const cars = await prisma.car.findMany();

    const total = await prisma.car.count();

    const totalPages = Math.ceil(total / limit);
    return (
        <div>
            <Header />
            <div className="p-4 flex flex-col gap-y-4">
                <CarList cars={cars} page={page} totalPages={totalPages}  />
            </div>
        </div>
    );
}
