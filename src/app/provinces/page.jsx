import axios from 'axios';
import Link from 'next/link';

async function getProvinces() {
  const response = await axios.get(`${process.env.API_URL}/province`, {
    headers: {
      key: process.env.API_KEY_RO,
    },
  });

  return response.data.rajaongkir.results;
}

export default async function Provinces() {
  const provinces = await getProvinces();
  // console.log(provinces);
  return (
    <ul className="p-3">
      {/* {provinces} */}
      {provinces.map(({ province_id, province }) => (
        <li key={province_id}>
          <Link href={`/provinces/${province_id}`}>{province}</Link>
        </li>
      ))}
    </ul>
  );
}
