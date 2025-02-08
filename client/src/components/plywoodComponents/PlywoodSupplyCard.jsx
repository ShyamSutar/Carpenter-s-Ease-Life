import { Card } from "flowbite-react";
import { PhoneIcon, EnvelopeIcon, MapPinIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

const PlywoodSupplyCard = ({ mistries }) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {mistries.map((mistry) => (
        <Card
          key={mistry.id}
          className="p-5 w-full lg:w-[48%]  rounded-xl shadow-lg border hover:shadow-2xl transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center bg-[#ED2A4F] text-white rounded-full text-xl font-bold">
              {mistry.name[0]}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{mistry.name}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MapPinIcon className="w-4 h-4 text-[#ED2A4F]" />
                {mistry.sites.length} Site{mistry.sites.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Sites List */}
          <div className="mt-3">
            {mistry.sites.map((site, index) => (
              <p key={index} className="text-sm text-gray-600">📍 {site}</p>
            ))}
          </div>

          {/* Contact & Email */}
          <div className="mt-4 flex flex-col gap-2 text-[#ED2A4F] font-medium">
            <p className="flex items-center">
              <PhoneIcon className="w-4 h-4 mr-2" />
              {mistry.contact}
            </p>
            <p className="flex items-center">
              <EnvelopeIcon className="w-4 h-4 mr-2" />
              {mistry.email}
            </p>
          </div>

          {/* Total Field */}
          <div className="mt-4 flex items-center text-[#ED2A4F] font-medium text-lg">
            <CurrencyDollarIcon className="w-5 h-5 mr-2" />
            Total: {mistry.total}
          </div>
        </Card>
      ))}
    </div>
  );
};

export {PlywoodSupplyCard}