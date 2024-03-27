import { Box, Typography } from "@mui/material";
import { Composer } from "../services/getMusicData";


export const EpochTimeLine = (props: { composer?: Composer | null }) => {

  const { composer } = props;

  const epochs = [
    { label: "Medieval", startYear: 1150, endYear: 1400, visible: true },
    { label: "Renaissance", startYear: 1400, endYear: 1600, visible: true },
    { label: "Baroque", startYear: 1600, endYear: 1750, visible: true },
    { label: "Classical", startYear: 1750, endYear: 1830, visible: true },
    { label: "Early Romantic", startYear: 1830, endYear: 1860, visible: false },
    { label: "Romantic", startYear: 1830, endYear: 1920, visible: true },
    { label: "Late Romantic", startYear: 1860, endYear: 1920, visible: false },
    { label: "20th Century", startYear: 1920, endYear: 1999, visible: false },
    { label: "Post-War", startYear: 1945, endYear: 1960, visible: false },
    { label: "21st Century", startYear: 2000, endYear: (new Date()).getFullYear(), visible: false },
    { label: "Modern", startYear: 1920, endYear: (new Date()).getFullYear(), visible: true },
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

  const getComposerYear = (cYear: string | undefined | null) => {
    if (!cYear) {
      return Number((new Date()).getFullYear());
    }
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
        height: 75,
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

        <Box
          sx={{
            position: 'absolute',
            left: `${xScale(getComposerYear(composer?.birth))}%`,
            right: `${100 - xScale(getComposerYear(composer?.death))}%`,
            top: 17,
            height: 20,
            transitionProperty: 'left, right',
            transitionDuration: '0.5s',
            // background: '#ddd',
            backgroundColor: theme => theme.palette.primary.light,
            borderLeft: '2px dotted black',
            borderRight: '2px dotted black',
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
              // background: '#D9F0FF',
              left: `calc(${xScale(epoch.startYear)}% + 1px)`,
              right: `calc(${100 - xScale(epoch.endYear)}% + 1px)`,
              height: 8,
              top: 16,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                position: 'absolute',
                top: -18,
                fontSize: 12,
                fontWeight: 700,
                fontStyle: 'italic',
                left: 0,
                right: 0,
                textAlign: 'center',
              }}
            >
              { epoch.label }
            </Typography>
          </div>
        ))}

        <div
          id="tick-bar"
          style={{
            position: 'absolute',
            left: 0,
            top: 36,
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
              top: 36,
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                marginLeft: -1.6,
                marginTop: 0.6,
                fontStyle: 'italic',
              }}
            >
              { tick.showLabel ? tick.year : " " }
            </Typography>

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
