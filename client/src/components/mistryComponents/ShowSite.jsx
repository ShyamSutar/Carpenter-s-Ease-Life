import ShowSiteList from "./ShowSiteList"

const ShowSite = () => {
  
  return (
    <div className="mt-24">
      <h1>Sites</h1>
      <input type="text" className="border-b m-2" placeholder="site name"/>
      <input type="text" className="border-b m-2" placeholder="site location"/>
      <button className="bg-red-400">Create site</button>

      <ShowSiteList />
    </div>
  )
}

export default ShowSite