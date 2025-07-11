import { prisma } from "@/lib/prisma";
import Header from "./components/Header";
import CarList from "./components/CarList";

export default async function Home({
    searchParams,
}: {
    searchParams: { page?: string; status?: string };
}) {
    const page = await parseInt(searchParams.page || "1", 10);

    const cars = await prisma.car.findMany();

    return (
        <div>
            <Header />
            <div className="bg-neutral-900 p-4 flex flex-col gap-y-4">
                <CarList cars={cars} page={page} />
            </div>
        </div>
    );
}
