const SlipList = ({slip}) => {
    return (
      <div className="mt-4 mr-4 rounded-md border bg-slate-100 shadow-md">
          <div className="w-full p-4">
            <h2 className="font-semibold">
              Received {slip.totalAmount} from {slip?.mistry?.username} 
            </h2>
            <h2 className="font-semibold">
              totalAttendance: {slip?.totalAttendance} 
            </h2>
            <h2 className="font-semibold">
              totalAdvance: {slip?.totalAdvance} 
            </h2>
            <h2 className="font-semibold">
              totalAmount: {slip?.totalAmount} 
            </h2>
            <h2 className="font-semibold">
              At: {new Date(slip?.createdAt).toLocaleString()}
            </h2>
          </div>
        </div>
    )
  }
  
  export default SlipList