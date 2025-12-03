import { Sidebar } from '@/components/Sidebar'

const FacturesPage = () => {
    return (
        <div className="min-h-screen bg-white p-6">
            <h1 className="text-2xl font-bold mb-6">Счета-фактуры полученные</h1>
            {/* Sidebar */}
            <Sidebar activeIndex={1} />
            {/* Здесь будет таблица счетов-фактур */}
        </div>
    );
};

export default FacturesPage;

