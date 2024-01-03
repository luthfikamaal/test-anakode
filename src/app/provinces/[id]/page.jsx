import axios from 'axios';

export async function generateMetadata({ params }) {
  const { id } = params;
  const response = await axios.get(`${process.env.API_URL}/province?id=${id}`, {
    headers: {
      key: process.env.API_KEY_RO,
    },
  });

  return {
    title: response.data.rajaongkir.results.province,
  };
}

async function getProvince(id) {
  const response = await axios.get(`${process.env.API_URL}/province?id=${id}`, {
    headers: {
      key: process.env.API_KEY_RO,
    },
  });

  return response.data.rajaongkir.results;
}

async function getCitiesFromProvId(provinceId) {
  const response = await axios.get(`${process.env.API_URL}/city?province=${provinceId}`, {
    headers: {
      key: process.env.API_KEY_RO,
    },
  });

  return response.data.rajaongkir.results;
}

export default async function Province({ params }) {
  const { id } = params;
  const { province_id, province } = await getProvince(id);
  const cities = await getCitiesFromProvId(id);
  // console.log(province);
  // console.log(cities);

  return (
    <div className="p-3">
      {province}
      <ul>
        {cities.map((city) => (
          <li key={city.city_id}>
            {city.type} {city.city_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
