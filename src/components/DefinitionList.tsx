import { Card, CardContent, List, Typography } from '@mui/material';
import { Work } from '../services/getMusicData';
import { DefinitionMatch, getWorkTitleDefinitions } from '../services/getWorkTitleDefinitions';

export const DefinitionList = (props: { work?: Work | null }) => {

  const { work } = props;
  
  if (!work) return null;

  return (
    <>
      <List>
        { getWorkTitleDefinitions(work.title).map((d: DefinitionMatch) => {
          return (
            <Card
              key={d.label}
              sx={{
                p: 0,
                my: 0,
              }}
            >
              <CardContent
                sx={{
                  p: 1,
                  my: 0,
                  mx: 1,
                  pb: 0,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 16,
                    m:0,
                  }}
                >
                  { d.match }
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    m: 0,
                    p: 0,
                  }}
                >
                  { d.definition }
                </Typography>
              </CardContent>
            </Card>
          );
        }) }
      </List>
    </>
  );
};
