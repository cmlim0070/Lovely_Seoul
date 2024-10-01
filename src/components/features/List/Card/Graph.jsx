import { ResponsiveBar } from "@nivo/bar";
import "./Card.css";

export default function Graph({ data }) {
    return (
        <ResponsiveBar
            data={data}
            keys={[
                "기타",
                "10대",
                "20대",
                "30대",
                "40대",
                "50대",
                "60대",
                "70대",
            ]}
            maxValue={100}
            indexBy="age"
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            padding={0.55}
            layout="horizontal"
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={({ id }) => {
                const colorMap = {
                    기타: "hsl(164, 100%, 84%)",
                    "10대": "hsl(8, 100%, 82%)",
                    "20대": "hsl(35, 100%, 72%)",
                    "30대": "hsl(45, 100%, 70%)",
                    "40대": "hsl(140, 59%, 70%)",
                    "50대": "hsl(205, 100%, 75%)",
                    "60대": "hsl(268, 100%, 86%)",
                    "70대": "hsl(0, 2%, 69%)",
                };
                return colorMap[id];
            }}
            defs={[
                {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "#38bcb2",
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "#eed312",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            fill={[
                {
                    match: {
                        id: "fries",
                    },
                    id: "dots",
                },
                {
                    match: {
                        id: "sandwich",
                    },
                    id: "lines",
                },
            ]}
            borderColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={null}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
            }}
            legends={[
                {
                    dataFrom: "keys",
                    anchor: "bottom",
                    direction: "row",
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 60,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={(e) =>
                e.id + ": " + e.formattedValue + " in country: " + e.indexValue
            }
        />
    );
}
