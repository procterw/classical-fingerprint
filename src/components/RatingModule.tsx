import { useWorkRatings } from "../services/useWorkRatings";

export const RatingModule = (props: {workId: string}) => {
    const { workRatings, updateWorkRatings } = useWorkRatings();
    
    const activeRating: number = workRatings[props.workId];

    const isSelectedStyle = (n: number) => {
        if (!activeRating || activeRating !== n) return {};

        return {
            background: 'green'
        };
    }

    return (
        <ul>
            { [1, 2, 3, 4, 5].map((n) => {
                return (
                    <li key={n}>
                        <button
                            onClick={() => updateWorkRatings(props.workId, n)}
                            style={isSelectedStyle(n)}
                        >
                            { n }
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

