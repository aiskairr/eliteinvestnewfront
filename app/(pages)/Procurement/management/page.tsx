"use client";

import { Sidebar } from "@/components/Sidebar";

const ManagementPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
                {/* Sidebar */}
            <Sidebar activeIndex={1} />
            <h1 className="text-2xl font-bold mb-6">Управление закупками</h1>
            {/* Здесь будет функционал управления закупками */}
        </div>
    );
};

export default ManagementPage;
