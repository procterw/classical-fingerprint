import { Box, Chip, Typography } from "@mui/material";
import { useWorkQueue } from "../../state/useWorkQueue";


export const EpochTimeLine = () => {

  const { activeWork } = useWorkQueue();

  if (!activeWork) return null;

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

  const epochMap: { [key: string]: string } = {
    'Medieval': 'Medieval',
    'Renaissance': 'Renaissance',
    'Baroque': 'Baroque',
    'Classical': 'Classical',
    'Early Romantic': 'Romantic',
    'Romantic': 'Romantic',
    'Late Romantic': 'Romantic',
    '20th Century': 'Modern',
    'Post-War': 'Modern',
    '21st Century': 'Modern',
    'Modern': 'Modern',
  };
  
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
        emphasizeTick: iYear % 100 === 0,
      });

      iYear = iYear + 50;
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
        height: 56,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          sx={{
            position: 'absolute', 
            left: `${xScale(getComposerYear(activeWork.composer.birth))}%`,
            right: `${100 - xScale(getComposerYear(activeWork.composer.death))}%`,
            top: 29,
            height: 12,
            transitionProperty: 'left, right',
            transitionDuration: '0.7s',
            transitionTimingFunction: 'ease-in-out',
            backgroundColor: theme => theme.palette.primary.light,
            borderRadius: 20,
            opacity: 0.6,
          }}
        />

        { activeWork.date > 0 && (
            <Typography
              sx={{
                position: 'absolute',
                left: `calc(${xScale(activeWork.date)}% - 4.5px)`,
                transitionProperty: 'left',
                transitionDuration: '0.5s',
                transitionTimingFunction: 'ease-in-out',
                fontSize: 15,
                top: 24,
              }}
            >
              ▲
            </Typography>
          )}

        {/* epoch bar wrappers */}

        <div
          style={{
            position: 'absolute',
            top: 2,
            left: 0,
            right: 0,
          }}
        >
          { epochs.filter((e) => e.visible).map((epoch) => (
            <Chip
              key={epoch.label}
              label={epoch.label}
              variant="filled"
              // variant={epoch.label === epochMap[activeWork.composer.epoch] ? undefined : "outlined"}
              // color={epoch.label === epochMap[activeWork.composer.epoch] ? "secondary" : undefined }
              size="small"
              style={{
                padding: 0,
              }}
              sx={{
                "& .MuiChip-label": {
                  px: 0.2,
                },
                backgroundColor: 'inherit',
                fontSize: 11,
                fontWeight: 500,
                position: 'absolute',
                left: `calc(${xScale(epoch.startYear)}%)`,
                right: `calc(${100 - xScale(epoch.endYear)}%)`,
              }}
            />
          ))}
        </div>

        <div
          id="tick-bar"
          style={{
            position: 'absolute',
            left: 0,
            top: 29,
            width: '100%',
            height: 0,
            borderBottom: '1px dotted #444',
            zIndex: 500,
          }}
        />

        { getYearTicks().map((tick) => (
          <div
            key={tick.year}
            style={{
              position: 'absolute',
              left: `${xScale(tick.year)}%`,
              top: 30,
              zIndex: 500,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: 12,
                fontWeight: 500,
                marginLeft: -1.4,
                marginTop: 1.2,
                color: 'black', 
              }}
            >
              { tick.showLabel ? tick.year : " " }
            </Typography>

            <div
              style={{
                position: 'absolute',
                width: 3,
                height: 3,
                borderRadius: 3,
                background: '#333',
                // left: `calc(50% - 1)`,
                top: -2,
              }}
            />
          </div>
        )) }
      </div>
    </div>
  );
};
