/* eslint-disable react/prop-types */

const TableRow = ({ item, handleExpandRow }) => {
  return (
    <tr
      onClick={handleExpandRow}
      className="bg-white border-b font-medium cursor-pointer"
    >
      <th
        scope="row"
        className="flex items-center gap-x-4 px-6 py-4 text-gray-900 whitespace-nowrap"
      >
        <img
          className="w-8 h-8 rounded-full"
          src={item?.image}
          alt="Jese image"
        />
        <div className="ps-3 text-wrap">
          <div className="text-sm">{item?.title}</div>
        </div>
      </th>
      <td className="px-6 py-4">{item?.shopName}</td>
      <td className="px-6 py-4">
        {item?.price.amount} {item?.price.currency_code}
      </td>
      <td className="px-6 py-4">{item.num_favorers}</td>
      <td className="px-6 py-4">{item.views}</td>
    </tr>
  );
};

export default TableRow;
