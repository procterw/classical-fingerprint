import { Box, Paper, Typography } from "@mui/material";
import { Composer } from "../services/getMusicData";
import { ComposerAvatar } from "./ComposerCard";


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
        emphasizeTick: iYear % 100 === 0,
      });

      iYear = iYear + 25;
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
        height: 70,
        // background: '#DDD',
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
            left: `${xScale(getComposerYear(composer?.birth))}%`,
            right: `${100 - xScale(getComposerYear(composer?.death))}%`,
            top: 42,
            height: 26,
            transitionProperty: 'left, right',
            transitionDuration: '0.5s',
            // backgroundColor: theme => theme.palette.primary.light,
            border: 'none',
            borderBottom: '1px solid black',
            borderLeft: '1px solid black',
            borderRight: '1px solid black',
            background: "rgba(218, 106, 87, 0.5)",
            // theme.palette.primary.main,
            // opacity: 0.8,
            zIndex: 500,
            // borderLeft: '2px dotted black',
            // borderRight: '2px dotted black',
          }}
        >
          <Box
            position="absolute"
            width="200"
            left="-35px"
            textAlign="end"
            // left="calc(0"
          >
            <Typography variant="caption" sx={{ fontSize: 16, fontWeight: 500 }}>
              { getComposerYear(composer?.birth) }
            </Typography>
          </Box>

          <Box
            // position="absolute"
            // left="-48px"
            // bottom="-4px"
            mt={1}
          >
            <ComposerAvatar composer={composer || undefined} avatarSize={30} />
          </Box>

          <Box
            position="absolute"
            right="-35px"
            textAlign="start"
            width="200"
            // left="calc(0"
          >
            <Typography variant="caption" sx={{ fontSize: 16, fontWeight: 500 }}>
              { getComposerYear(composer?.death) }
            </Typography>
          </Box>

          {/* <Box
            position="absolute"
            bottom="-23px"
            display="flex"
            whiteSpace="nowrap"
            justifyContent="center"
            alignItems="center"
            height={20}
            // left={0}
            // right={0}
            borderTop='1px solid black'
            borderLeft='1px solid black'
            borderRight='1px solid black'
            width="auto"
            pt={2.3}
            px={1}
          >
            <Typography variant="caption" sx={{ fontSize: 16, fontWeight: 500 }}>
              { getComposerYear(composer?.birth) }
            </Typography>

            <Box
              // position="absolute"
              // left="-48px"
              // bottom="-4px"
              mx={1}
            >
              <ComposerAvatar composer={composer || undefined} avatarSize={30} />
            </Box>

            <Typography variant="caption" sx={{ fontSize: 16, fontWeight: 500 }}>
              { getComposerYear(composer?.death) }
            </Typography>
          </Box> */}
        </Box>

        {/* epoch bar wrappers */}
        <div
          style={{
            // background: '#F6F1EA',
            // background: 'linear-gradient(#000, rgba(0, 0, 0, 0.4))',
            // background: 'black',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 18,
          }}
        >
          { epochs.filter((e) => e.visible).map((epoch) => (
            <Paper
              square={true}
              key={epoch.label}
              elevation={0}
              style={{
                position: 'absolute',
                border: '1px solid black',
                // borderTop: '1px solid #F6F1EA',
                // borderLeft: '1px solid black',
                // borderRight: '1px solid black',
                // borderBottom: '1px solid #F6F1EA',
                background: 'white  ',
                left: `calc(${xScale(epoch.startYear)}% + 2px)`,
                right: `calc(${100 - xScale(epoch.endYear)}% + 2px)`,
                height: 38,
                top: 8,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  // position: 'absolute',
                  // top: -18,
                  // top: 0,
                  fontSize: 12,
                  fontWeight: 700,
                  // fontStyle: 'italic',
                  // left: 0,
                  // right: 0,
                  // color: '#F6F1EA',
                  color: 'black',
                  textAlign: 'center',
                  // background: 'rgba(0,0,0,0.9)',
                  // backgroundColor: theme => theme.palette.primary.dark,
                  // background: 'white',
                  // display: 'inline',
                  // zIndex: 500,
                  px: 0.5,
                  py: 0.5,
                }}
              >
                { epoch.label }
              </Typography>
            </Paper>
          ))}
        </div>

        {/* <div
          id="tick-bar"
          style={{
            position: 'absolute',
            left: 0,
            top: 36,
            width: '100%',
            background: 'black',
            height: 1,
            zIndex: 500,
          }}
        /> */}

        { getYearTicks().map((tick) => (
          <div
            key={tick.year}
            style={{
              position: 'absolute',
              left: `${xScale(tick.year)}%`,
              top: 44,
              zIndex: 500,
            }}
          >
            {/* <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                marginLeft: -1.6,
                marginTop: 0.4,
                fontStyle: 'italic',
                color: 'black', 
              }}
            >
              { tick.showLabel ? tick.year : " " }
            </Typography> */}

            <div
              style={{
                position: 'absolute',
                width: tick.emphasizeTick ? 3 : 1,
                height: 6,
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
