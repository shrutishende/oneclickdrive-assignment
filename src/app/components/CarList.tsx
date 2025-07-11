"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Status } from "@/lib/car";
import { useRouter, useSearchParams } from "next/navigation";
import Alert from "@mui/material/Alert";
import { Button, Snackbar } from "@mui/material";
import Image from "next/image";
import { Car } from "./EditForm";

interface CarListProps {
    page: number;
    cars: Car[];
}

const CarList = ({ cars, page }: CarListProps) => {
    const [currentPage, setCurrentPage] = useState(page);
    const [currentCars, setCurrentCars] = useState<Car[]>([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateStatus = async (car: Car, newStatus: string) => {
        try {
            car.status = newStatus;
            const res = await fetch(`/api/cars/${car.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(car),
            });

            if (res.ok) {
                setAlert({
                    open: true,
                    message: `Car ${car.name} status updated to ${newStatus}!`,
                    severity: "success",
                });
                router.refresh();
            } else {
                setAlert({
                    open: true,
                    message: `Failed to update car ${car.name} status.`,
                    severity: "error",
                });
            }
        } catch (error: unknown) {
            setAlert({
                open: true,
                message: `Error updating car status: ${
                    (error as Error).message
                }`,
                severity: "error",
            });
        }
    };

    const handleFilterChange = (newStatus: string) => {
        setStatusFilter(newStatus);
        setCurrentPage(1);
        const params = new URLSearchParams(searchParams);

        params.set("page", "1");

        if (newStatus) {
            params.set("status", newStatus);
        } else {
            params.delete("status");
        }
        router.push(`/?${params.toString()}`);
    };

    useEffect(() => {
        // Filter cars by status
        let filteredcars = cars;
        if (statusFilter) {
            filteredcars = cars.filter(
                (car) => car.status.toLowerCase() === statusFilter.toLowerCase()
            );
        }
        // Apply pagination
        const startIndex = (currentPage - 1) * 10;
        const endIndex = startIndex + 10;
        setCurrentCars(filteredcars.slice(startIndex, endIndex));

        // Update total pages based on filtered cars

        const newTotalPages = Math.ceil(filteredcars.length / 10);
        if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
            const params = new URLSearchParams(searchParams);
            params.set("page", newTotalPages.toString());
            router.push(`/?${params.toString()}`);
        }
    }, [currentPage, cars, statusFilter, router, searchParams]);

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setCurrentPage(value);
        const params = new URLSearchParams(searchParams);
        params.set("page", value.toString());
        if (statusFilter) params.set("status", statusFilter);
        router.push(`/?${params.toString()}`);
    };

    useEffect(() => {
        const status = searchParams.get("status") || "";
        setStatusFilter(status);
    }, [searchParams]);

    return (
        <section className="mx-auto  px-4  w-full sm:px-6 ">
            <Snackbar
                open={alert.open}
                autoHideDuration={3000}
                onClose={() =>
                    setAlert({
                        open: false,
                        message: "",
                        severity: "success",
                    })
                }
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    severity={alert.severity}
                    onClose={() =>
                        setAlert({
                            open: false,
                            message: "",
                            severity: "success",
                        })
                    }
                >
                    <p className="text-sm font-bold space-x-1">
                        {alert.message}
                    </p>
                </Alert>
            </Snackbar>

            <div className="flex flex-col sm:flex-row items-center justify-center">
                <label
                    htmlFor="status"
                    className="block mb-2 text-lg text-gray-900 dark:text-white p-2 "
                >
                    Filter by status:
                </label>
                <select
                    value={statusFilter}
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            <div className="grid  mt-10  grid-cols-1 mx-auto bg-black ">
                {currentCars.map((car) => (
                    <div key={car.id}>
                        <div className="flex items-center justify-center md:gap-20 gap-10 max-sm:gap-3 overflow-hidden rounded-lg border bg-white  dark:bg-black relative border-neutral-200 dark:border-neutral-800">
                            <div className="max-sm:w-[50%]">
                                <Image
                                    src={car.image_url}
                                    alt="image"
                                    width={300}
                                    height={500}
                                    className="object-cover rounded-2xl mt-8 mb-8 p-2"
                                />
                            </div>

                            <div className="block items-center ">
                                <h3 className="text-xl font-bold text-white max-sm:text-sm">
                                    {car.name}
                                </h3>
                                <p className="text-blue-600 mt-2 mb-2">
                                    ${car.price}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-2 w-full justify-center action-button-wrapper">
                                    <Button
                                        variant="contained"
                                        className="custom-disabled-button action-button"
                                        onClick={() =>
                                            updateStatus(car, Status.Approved)
                                        }
                                        disabled={
                                            car.status === Status.Approved
                                        }
                                        sx={{
                                            // Style for disabled state
                                            "&.Mui-disabled": {
                                                backgroundColor: "#555", // Visible gray background for disabled state
                                                color: "#ccc", // Light text color for contrast
                                                opacity: 1,
                                            },
                                        }}
                                    >
                                        Approve
                                    </Button>

                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            updateStatus(car, Status.Rejected)
                                        }
                                        className="custom-disabled-button action-button"
                                        disabled={
                                            car.status === Status.Rejected
                                        }
                                        sx={{
                                            // Style for disabled state
                                            "&.Mui-disabled": {
                                                backgroundColor: "#555", // Visible gray background for disabled state
                                                color: "#ccc", // Light text color for contrast
                                                opacity: 1,
                                            },
                                        }}
                                    >
                                        Reject
                                    </Button>
                                    <Link href={`edit/${car.id}`}>
                                        <Button
                                            className="action-button"
                                            variant="contained"
                                            sx={{
                                                opacity: 1,
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div
                style={{ backgroundColor: "#000", padding: "20px" }}
                className="flex  items-center justify-center  mt-8"
            >
                <Pagination
                    count={Math.ceil(
                        (statusFilter
                            ? cars.filter(
                                  (car) =>
                                      car.status.toLowerCase() ===
                                      statusFilter.toLowerCase()
                              ).length
                            : cars.length) / 10
                    )}
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: "#fff",
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                            },
                            "&.Mui-selected": {
                                backgroundColor: "#fff",
                                color: "#000",
                                "&:hover": {
                                    backgroundColor: "#e0e0e0",
                                },
                            },
                        },
                        "& .MuiPaginationItem-ellipsis": {
                            color: "#fff",
                        },
                        "& .MuiPaginationItem-icon": {
                            color: "#fff",
                        },
                    }}
                />
            </div>
        </section>
    );
};

export default CarList;
