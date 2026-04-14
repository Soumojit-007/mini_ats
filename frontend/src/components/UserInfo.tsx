const UserInfo = ({data}:any) =>{
    return(
        <div className="glass">
            <h2>{data.name}</h2>
            <p>Experience: {data.yearOfExperience} years</p>
            <p>Expected Salary: {data.salary}</p>
            <div>
                {data.resumeSkills.map((skill: string , i:number) =>{
                    <span key={i} className="badge">{skill}</span>
                })}
            </div>
        </div>
    )
}

export default UserInfo