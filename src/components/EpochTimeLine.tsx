import { Composer } from "../services/getMusicData";


export const EpochTimeLine = (props: { composer?: Composer | null }) => {

  const { composer } = props;

  if (!composer) return null;

  const epochs = [
    { label: "Medieval", startYear: 1150, endYear: 1400, visible: true },
    { label: "Renaissance", startYear: 1400, endYear: 1600, visible: true },
    { label: "Baroque", startYear: 1600, endYear: 1750, visible: true },
    { label: "Classical", startYear: 1750, endYear: 1830, visible: true },
    { label: "Early Romantic", startYear: 1830, endYear: 1860, visible: false },
    { label: "Romantic", startYear: 1830, endYear: 1920, visible: true },
    { label: "Late Romantic", startYear: 1860, endYear: 1920, visible: false },
    { label: "20th Century", startYear: 1920, endYear: 1999, visible: true },
    { label: "Post-War", startYear: 1945, endYear: 1960, visible: false },
    { label: "21st Century", startYear: 2000, endYear: (new Date()).getFullYear(), visible: false },
  ];

  const yearRange = [
    Math.min(...epochs.map((e) => e.startYear)),
    Math.max(...epochs.map((e) => e.endYear)),
  ];

  const getYearTicks = () => {
    let iYear = yearRange[0];
    const ticks = [];

    while (iYear <= yearRange[1]) {
      ticks.push({
        year: iYear,
        showLabel: iYear % 100 === 0,
        emphasizeTick: iYear % 50 === 0,
      });

      iYear = iYear + 10;
    }

    return ticks;
  };

  console.log(getYearTicks());

  const getComposerYear = (cYear: string) => {
    return Number(cYear.split('-')[0]);
  }

  // Get X scale for a given date
  const xScale = (date: number) => {
    const oldYears = [yearRange[0], 1699];
    const recentYears = [1700, yearRange[1]];

    if (date < 1700) {
      const range = oldYears[1] - oldYears[0];
      const offset = date - oldYears[0];

      return 0.5 * (100 * (offset / range));
    }

    const range = recentYears[1] - recentYears[0];
    const offset = date - recentYears[0];

    return 50 + (0.5 * (100 * (offset / range)));
  };

  return (
    <div
      style={{
        display: 'block',
        position: 'relative',
        width: '100%',
        height: 50,
        // background: '#DDD',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 5,
          right: 5,
          bottom: 0,
        }}
      >

        <div
          style={{
            position: 'absolute',
            left: `${xScale(getComposerYear(composer.birth))}%`,
            right: `${100 - xScale(getComposerYear(composer.death))}%`,
            top: -8,
            bottom: -4,
            transitionProperty: 'left, right',
            transitionDuration: '0.5s',
            background: '#FBEBBA',
            boxShadow: '5px 5px 1px 0px #E2C055',
            borderRadius: 5,
          }}
        />

        { epochs.filter((e) => e.visible).map((epoch) => (
          <div
            key={epoch.label}
            style={{
              position: 'absolute',
              borderTop: '1px solid black',
              borderLeft: '1px solid black',
              borderRight: '1px solid black',
              background: '#D9F0FF',
              left: `calc(${xScale(epoch.startYear)}% + 1px)`,
              right: `calc(${100 - xScale(epoch.endYear)}% + 1px)`,
              height: 8,
              top: 16,
            }}
          >
            <label
              style={{
                position: 'absolute',
                top: -15,
                fontSize: 11  ,
                fontWeight: 700,
                fontStyle: 'italic',
                left: 0,
                right: 0,
                textAlign: 'center',
              }}
            >
              { epoch.label }
            </label>
          </div>
        ))}

        <div
          id="tick-bar"
          style={{
            position: 'absolute',
            left: 0,
            top: 26,
            width: '100%',
            background: 'black',
            height: 1,
          }}
        />

        { getYearTicks().map((tick) => (
          <div
            key={tick.year}
            style={{
              position: 'absolute',
              left: `${xScale(tick.year)}%`,
              top: 26,
            }}
          >
            <label
              style={{
                fontSize: 11,
                fontWeight: 700,
                marginLeft: -12,
              }}
            >
              { tick.showLabel ? tick.year : " " }
            </label>

            <div
              style={{
                position: 'absolute',
                width: tick.emphasizeTick ? 2 : 1,
                height: 4,
                background: 'black',
                left: `calc(50% - 1)`,
                top: 0,
              }}
            />
          </div>
        )) }
      </div>
    </div>
  );
};
