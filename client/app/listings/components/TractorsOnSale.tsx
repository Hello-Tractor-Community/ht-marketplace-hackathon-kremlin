import Image from "next/image";

const TractorCard = ({ image, title, features }) => {
  return (
    <div className="flex items-center mb-5 border border-gray-300 p-4">
      <div className="w-24 mr-5">
        <Image src={image} alt={title} width={100} height={100} />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-gray-600">{features}</p>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-3">
          View Details
        </button>
      </div>
    </div>
  );
};

const TractorsOnSale = () => {
  const tractors = [
    {
      image: "/new-holland-t175.jpg",
      title: "New Holland T175",
      features: "Key features: Multi-purpose, Powerful",
    },
    {
      image: "/massey-ferguson-mf-385.jpg",
      title: "Massey Ferguson MF 385",
      features: "Key features: Versatile, Reliable",
    },
    {
      image: "/kubota-l4508.jpg",
      title: "Kubota L4508",
      features: "Key features: Compact, Maneuverable",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {tractors.map((tractor, index) => (
        <TractorCard
          key={index}
          image={tractor.image}
          title={tractor.title}
          features={tractor.features}
        />
      ))}
    </div>
  );
};

export default TractorsOnSale;
