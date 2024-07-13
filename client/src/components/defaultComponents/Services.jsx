import { useMediaQuery } from 'react-responsive';

const Services = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 639 });

  // Determine the image source based on the current screen size
  let imageSrc;
  let imageSrc2;
  if (isMobile) {
    imageSrc = "/images/carpenter2Mobile.jpg";
    imageSrc2 = "/images/carpenter1Mobile.svg";
  }else{
    imageSrc = "/images/carpenter2.jpg";
    imageSrc2 = "/images/carpenter1.svg";
  }

  return (
    <div className="max-w-screen-lg mx-auto" id="services">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col sm:flex-row w-full justify-center">
          <div className="sm:flex-1">
            <div className="px-12 pb-12 sm:p-2 ">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight border-l-4 border-l-black pl-4 ">
                #Services
              </h2>
              <div>
                <h3 className="text-2xl md:text-3xl mt-4">Attendance System</h3>
                <p className="mt-4 text-[0.9rem]">
                  Track carpenter attendance easily with a daily (hajri) and
                  monthly system. Record check-ins and check-outs to maintain
                  accurate attendance records.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl mt-4">Payment Gateway</h3>
                <p className="mt-4 text-[0.9rem]">
                  {" "}
                  Facilitate secure payments through a reliable payment gateway.
                  Support advanced payments and manage financial transactions
                  seamlessly.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl mt-4">Inventory Management</h3>
                <p className="mt-4 text-[0.9rem]">
                  Allow plywood and hardware shop owners to add, update, and
                  manage their inventory items. Track all materials received and
                  maintain comprehensive records.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl mt-4">Expense Tracking</h3>
                <p className="mt-4 text-[0.9rem]">
                  Monitor all project-related expenses in real-time. Clients,
                  carpenters, and shop owners can view and manage their
                  financial contributions easily.
                </p>
              </div>
            </div>
          </div>
          <div className=" sm:flex-1 flex justify-center items-center">
            <img
            className='sm:w-[280px]  md:w-[400px] '
              src={imageSrc}
              width={400}
              alt="Carpenter Image 1"
              data-aos="fade-left"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full justify-center">
          <div className="sm:flex-1 sm:order-2">
            <div className="px-12 pb-12 sm:p-2 ">
              <div>
                <h3 className="text-2xl md:text-3xl mt-4">Client Progress Monitoring</h3>
                <p className="mt-4 text-[0.9rem]">
                  Clients can track the progress of their projects with updates
                  on milestones, completed tasks, and remaining work.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl mt-4">Carpenter Selection Feature</h3>
                <p className="mt-4 text-[0.9rem]">
                  Clients can browse a curated list of available carpenters,
                  filter by skills, experience, and ratings, and select the best
                  fit for their project.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl mt-4">Real-Time Chat Functionality</h3>
                <p className="mt-4 text-[0.9rem]">
                  {" "}
                  Integrated chat feature allows clients and carpenters to
                  communicate in real-time, facilitating quick discussions and
                  clarifications.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl mt-4">User-Friendly</h3>
                <p className="mt-4 text-[0.9rem]">
                  Interactive guide for first-time users, introducing them to
                  the application’s features and functionalities.
                </p>
              </div>
            </div>
          </div>
          <div
            className="sm:flex-1 flex justify-center items-center sm:order-1"
            data-aos="fade-right"
          >
            <img
            className='sm:w-[280px]  md:w-[400px]'
              src={imageSrc2}
              width={400}
              alt="Carpenter Image 1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
