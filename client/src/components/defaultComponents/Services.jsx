import { FaCheckCircle } from "react-icons/fa";

const services = [
  {
    title: "Attendance System",
    description:
      "Track carpenter attendance easily with a daily (hajri) and monthly system. Record check-ins and check-outs to maintain accurate attendance records.",
  },
  {
    title: "Ledger Management",
    description:
      "Tracks expenses, material purchases, and payments, providing transparent and real-time financial records for carpenters, clients, and suppliers.",
  },
  {
    title: "Inventory Management",
    description:
      "Allow plywood and hardware shop owners to add, update, and manage their inventory items. Track all materials received and maintain comprehensive records.",
  },
  {
    title: "Expense Tracking",
    description:
      "Monitor all project-related expenses in real-time. Clients, carpenters, and shop owners can view and manage their financial contributions easily.",
  },
  {
    title: "Client Progress Monitoring",
    description:
      "Clients can track the progress of their projects with updates on milestones, completed tasks, and remaining work.",
  },
  {
    title: "Carpenter Selection Feature",
    description:
      "Clients can browse a curated list of available carpenters, filter by skills, experience, and ratings, and select the best fit for their project.",
  },
  {
    title: "Real-Time Chat Functionality",
    description:
      "Integrated chat feature allows clients and carpenters to communicate in real-time, facilitating quick discussions and clarifications.",
  },
  {
    title: "User-Friendly Experience",
    description:
      "Interactive guide for first-time users, introducing them to the application’s features and functionalities.",
  },
];

const Services = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16" id="services">
      <h2 className="text-4xl font-bold text-center text-gray-800 pl-4 mb-12">
        Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex gap-4 p-6 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <FaCheckCircle className="text-green-500 text-3xl" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
