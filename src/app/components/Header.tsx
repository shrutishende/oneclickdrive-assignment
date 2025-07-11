"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

function Header() {
    const { user, isSignedIn } = useUser();
    return (
        <header className="bg-black  text-white p-2">
            <div className="container mx-auto flex justify-between  items-center">
                <Link href="/" className="text-xl font-bold  md:block">
                    OneClickDrive
                </Link>
                {isSignedIn ? (
                    <div className="bg-black border border-white rounded-xl py-1">
                        <Button className=" hover:bg-gray-800">
                            <UserButton />
                        </Button>
                    </div>
                ) : null}
            </div>
        </header>
    );
}

export default Header;
