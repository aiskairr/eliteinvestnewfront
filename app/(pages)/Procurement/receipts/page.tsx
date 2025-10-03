"use client";

import { Sidebar } from "@/components/Sidebar";

const ReceiptsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-bold mb-6">Приемки</h1>
            {/* Sidebar */}
            <Sidebar activeIndex={1} />
            {/* Здесь будет таблица приемок */}
        </div>
    );
};

export default ReceiptsPage;
