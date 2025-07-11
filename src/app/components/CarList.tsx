"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Car } from "@/generated/prisma";
import { Status } from "@/lib/car";
import { useRouter, useSearchParams } from "next/navigation";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { Button, dividerClasses, Snackbar } from "@mui/material";

const CarList = ({ cars, page, totalPages }) => {
    const [currentPage, setCurrentPage] = useState(page);
    const [currentCars, setCurrentCars] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success",
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
            // Refresh the page to reflect updated status

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
        } catch (error) {
            setAlert({
                open: true,
                message: `Error updating car status: ${error.message}`,
                severity: "error",
            });
        }
    };

    const handleFilterChange = (newStatus: string | null) => {
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
            console.log("filter car", filteredcars);
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
        <div>
            <Snackbar
                open={alert.open}
                autoHideDuration={3000}
                onClose={() =>
                    setAlert({ open: false, message: "", severity: "success" })
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
                    {alert.message}
                </Alert>
            </Snackbar>
            <label className="mr-2">Filter by status:</label>
            <select
                value={statusFilter}
                onChange={(e) => handleFilterChange(e.target.value || null)}
            >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
            </select>

            <div>
                <ul className="flex flex-col gap-y-2">
                    {currentCars.map((car) => (
                        <div key={car.id}>
                            <li key={car.id}>{car.name}</li>
                            <Button
                                onClick={() =>
                                    updateStatus(car, Status.Approved)
                                }
                                disabled={car.status === Status.Approved}
                            >
                                Approve
                            </Button>
                            <Button
                                onClick={() =>
                                    updateStatus(car, Status.Rejected)
                                }
                                disabled={car.status === Status.Rejected}
                            >
                                Reject
                            </Button>
                            <Link href={`edit/${car.id}`}>
                                <button>Edit</button>
                            </Link>
                        </div>
                    ))}
                </ul>
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
                />
            </div>
        </div>
    );
};

export default CarList;
