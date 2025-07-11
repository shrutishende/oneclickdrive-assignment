"use client";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import React from "react";
import { useAuth } from "@clerk/nextjs";
import { Status } from "@/lib/car";

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
    const { getToken } = useAuth();
    console.log(car);
    return (
        <div>
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
                        const token = await getToken();
                        console.log(token);
                        const res = await fetch(`/api/cars/${car.id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(values),
                        });
                        console.log("res");
                    } catch (error) {
                        console.log("Error updating car");
                    }
                }}
            >
                <Form>
                    <div>
                        <label htmlFor="name">Car Name</label>
                        <Field id="name" name="name" className="border" />
                        <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <div>
                        <label htmlFor="price">Price</label>
                        <Field id="price" name="price" className="border" />
                        <ErrorMessage
                            name="price"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <div role="group" aria-labelledby="my-radio-group">
                        <label>
                            <Field
                                type="radio"
                                name="status"
                                value={Status.Pending}
                            />
                            Pending
                        </label>
                        <label>
                            <Field
                                type="radio"
                                name="status"
                                value={Status.Approved}
                            />
                            Approved
                        </label>
                        <label>
                            <Field
                                type="radio"
                                name="status"
                                value={Status.Rejected}
                            />
                            Rejected
                        </label>
                        {/* <div>Picked: {values.picked}</div> */}
                    </div>

                    <button type="submit">Save</button>
                </Form>
            </Formik>
        </div>
    );
};

export default EditForm;
