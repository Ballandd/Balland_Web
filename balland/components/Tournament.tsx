export interface infoTournamentProps {
    team: String
}

const Tournament = (props: infoTournamentProps) => {
    return (
        <div className="w-[940px] h-[410px] bg-[#57667E]">
            <h1 className="items-center text-2xl font-bold">{props.team}</h1>
        </div>
    )
}

export default Tournament