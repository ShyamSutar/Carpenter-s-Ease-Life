const Services = () => {
  return (
    <div className="max-w-screen-lg mx-auto" id="services">
      <div className="flex flex-col gap-12">
      <div className="flex w-full justify-center">
            <div className="flex-1">
                <div className="p-12">
                    <h2 className="text-5xl font-semibold tracking-tight border-l-4 border-l-black pl-4 ">#Services</h2>
                    <div>
                        <h3 className="text-3xl mt-4">Attendance System</h3>
                        <p className="mt-4">Track carpenter attendance easily with a daily (hajri) and monthly system. Record check-ins and check-outs to maintain accurate attendance records.</p>
                    </div>

                    <div>
                        <h3 className="text-3xl mt-4">Payment Gateway</h3>
                        <p className="mt-4"> Facilitate secure payments through a reliable payment gateway. Support advanced payments and manage financial transactions seamlessly.</p>
                    </div>

                    <div>
                        <h3 className="text-3xl mt-4">Inventory Management</h3>
                        <p className="mt-4">Allow plywood and hardware shop owners to add, update, and manage their inventory items. Track all materials received and maintain comprehensive records.</p>
                    </div>

                    <div>
                        <h3 className="text-3xl mt-4">Expense Tracking</h3>
                        <p className="mt-4">Monitor all project-related expenses in real-time. Clients, carpenters, and shop owners can view and manage their financial contributions easily.</p>
                    </div>
                </div>
            </div>
            <div className=" flex-1 flex justify-center">
                <img src="/images/carpenter2.jpg" width={400} alt="Carpenter Image 1" data-aos="fade-left"/>
            </div>
        </div>

        <div className="flex w-full justify-center">
            <div className="flex-1  order-2">
                <div className="p-12">
                    <div>
                        <h3 className="text-3xl mt-4">Client Progress Monitoring</h3>
                        <p className="mt-4">Clients can track the progress of their projects with updates on milestones, completed tasks, and remaining work.</p>
                    </div>

                    <div>
                        <h3 className="text-3xl mt-4">Carpenter Selection Feature</h3>
                        <p className="mt-4">Clients can browse a curated list of available carpenters, filter by skills, experience, and ratings, and select the best fit for their project.</p>
                    </div>

                    <div>
                        <h3 className="text-3xl mt-4">Real-Time Chat Functionality</h3>
                        <p className="mt-4"> Integrated chat feature allows clients and carpenters to communicate in real-time, facilitating quick discussions and clarifications.</p>
                    </div>

                    <div>
                        <h3 className="text-3xl mt-4">User-Friendly</h3>
                        <p className="mt-4">Interactive guide for first-time users, introducing them to the application’s features and functionalities.</p>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex justify-center order-1" data-aos="fade-right">
                <img src="/images/carpenter1.svg" width={400} alt="Carpenter Image 1" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
