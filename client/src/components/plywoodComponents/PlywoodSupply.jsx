import { PlywoodSupplyCard } from "./PlywoodSupplyCard";

const PlywoodSupply = () => {
    const sampleMistries = [
        { id: 1, name: "Rajesh Kumar", sites: ["Greenwood Towers", "Skyline Residency"], contact: "9876543210", email: "rajesh@example.com", total: "₹50,000" },
        { id: 2, name: "Amit Singh", sites: ["Sunrise Apartments"], contact: "9876543211", email: "amit@example.com", total: "₹75,000" },
        { id: 3, name: "Suresh Patel", sites: ["Royal Garden", "Pearl Heights", "Grand Villas"], contact: "9876543212", email: "suresh@example.com", total: "₹1,20,000" }
      ];
      
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#ED2A4F]">Mistries Connected to You</h2>
      <PlywoodSupplyCard mistries={sampleMistries} />
    </div>
  )
}

export default PlywoodSupply