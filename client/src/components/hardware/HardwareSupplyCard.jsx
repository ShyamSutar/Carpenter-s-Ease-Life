import { Card } from "flowbite-react";
import { PhoneIcon, EnvelopeIcon, MapPinIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";

const HardwareSupplyCard = ({ sites }) => {
  // Group sites by mistry._id
  const groupedSites = sites.reduce((acc, site) => {
    const { mistry } = site;
    if (!acc[mistry._id]) {
      acc[mistry._id] = {
        mistry,
        sites: [],
      };
    }
    acc[mistry._id].sites.push(site);
    return acc;
  }, {});


  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {Object.values(groupedSites).map(({ mistry, sites }) => (
        <Card
          key={mistry._id}
          className="p-5 w-full lg:w-[48%] rounded-xl shadow-lg border hover:shadow-2xl transition-all duration-300"
        >
          {/* Mistry Header */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center bg-[#ED2A4F] text-white rounded-full text-xl font-bold">
              {mistry.username[0].toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{mistry.username}</h3>
              <p className="text-sm text-gray-500">Total Sites: {sites.length}</p>
            </div>
          </div>

          {/* Sites List */}
          <div className="mt-4">
            {sites.map((site) => (
              <Link to={`/hardware/hardwareSlug/${site._id}`} key={site._id} >
                <div className="border-t pt-3 mt-3">
                <h4 className="text-md font-semibold flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4 text-[#ED2A4F]" />
                  {site.siteName} ({site.location})
                </h4>
                </div>
              </Link>
            ))}
          </div>

          {/* Contact & Email */}
          <div className="mt-4 flex flex-col gap-2 text-[#ED2A4F] font-medium">
            <p className="flex items-center">
              <PhoneIcon className="w-4 h-4 mr-2" />
              {mistry.phone}
            </p>
            <p className="flex items-center">
              <EnvelopeIcon className="w-4 h-4 mr-2" />
              {mistry.email}
            </p>
          </div>

          {/* Total Field */}
          <div className="mt-4 flex items-center text-[#ED2A4F] font-medium text-lg">
            <CurrencyDollarIcon className="w-5 h-5 mr-2" />
            Total: ₹1,20,000
          </div>
        </Card>
      ))}
    </div>
  );
};

export default HardwareSupplyCard;
