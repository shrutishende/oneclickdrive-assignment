"use client";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Status } from "@/lib/car";
import Header from "./Header";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { Snackbar, Alert } from "@mui/material";

interface Car {
    id: string;
    name: string;
    price: number;
    status: string;
}

interface EditFormProps {
    car: Car;
}

const validationSchema = Yup.object({
    name: Yup.string().required("Car name is required"),
    price: Yup.number()
        .required("Price is required")
        .positive("Price must be a positive number")
        .min(0.01, "Price must be at least 0.01"),
});

const EditForm = ({ car }: EditFormProps) => {
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const router = useRouter();

    return (
        <>
            <Header />
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

            <div className="bg-neutral-900 h-screen  mx-auto flex justify-center py-10">
                <Formik
                    initialValues={{
                        id: car.id,
                        name: car.name,
                        price: car.price,
                        status: car.status,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (
                        values: Car,
                        { setSubmitting }: FormikHelpers<Car>
                    ) => {
                    try {
                            const res = await fetch(`/api/cars/${car.id}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(values),
                            });
                            if (res.ok) {
                                setAlert({
                                    open: true,
                                    message: `Car ${car.name} details saved!`,
                                    severity: "success",
                                });
                                router.refresh();
                            } else {
                                setAlert({
                                    open: true,
                                    message: `Failed to save car  detals.`,
                                    severity: "error",
                                });
                            }
                        } catch (error) {
                            setAlert({
                                open: true,
                                message: `Error updating car details: ${error.message}`,
                                severity: "error",
                            });
                        }
                    }}
                >
                    <Form>
                        <p className="text-white text-2xl">Edit Car Details</p>
                        <div className="mt-5">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Car Name
                            </label>
                            <Field
                                id="name"
                                name="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        <div className="mt-5">
                            <label
                                htmlFor="price"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Price
                            </label>
                            <Field
                                id="price"
                                name="price"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <ErrorMessage
                                name="price"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        <div
                            role="group"
                            aria-labelledby="my-radio-group"
                            className="block mt-5 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            <label className="p-2">
                                <Field
                                    type="radio"
                                    name="status"
                                    value={Status.Pending}
                                    className="p-2"
                                />
                                Pending
                            </label>
                            <label className="p-2">
                                <Field
                                    type="radio"
                                    name="status"
                                    value={Status.Approved}
                                    className="p-2"
                                />
                                Approved
                            </label>
                            <label className="p-2">
                                <Field
                                    type="radio"
                                    name="status"
                                    value={Status.Rejected}
                                    className="p-2"
                                />
                                Rejected
                            </label>
                        </div>
                        <div className="mt-5">
                            <Button variant="contained" type="submit">
                                Save
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    );
};

export default EditForm;
