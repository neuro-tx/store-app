export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-white container mx-auto">
      <header className="flex justify-between items-center border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">لوحة التحكم</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
          إضافة منتج
        </button>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          قائمة المنتجات
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border rounded-2xl shadow-sm hover:shadow-md p-4 transition bg-gray-50"
            >
              <h3 className="text-lg font-bold mb-1">
                زيت الزيتون البكر الممتاز
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                زيت طبيعي 100٪ من أجود أنواع الزيتون المحلي.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-green-700 font-semibold">120 جنيه</span>
                <button className="text-blue-600 font-medium hover:underline">
                  التفاصيل
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
