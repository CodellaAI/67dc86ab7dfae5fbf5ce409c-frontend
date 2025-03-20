
export default function ItemList({ items, onDeleteItem }) {
  if (items.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-500 text-center">No items found. Add your first item above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Items List</h2>
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item._id} className="py-4">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                {item.description && (
                  <p className="mt-1 text-gray-600">{item.description}</p>
                )}
              </div>
              <button
                onClick={() => onDeleteItem(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
