import { List, ListItem, ListItemText } from '@mui/material';
import { Work } from '../services/getMusicData';
import { DefinitionMatch, getWorkTitleDefinitions } from '../services/getWorkTitleDefinitions';

export const DefinitionList = (props: { work?: Work | null }) => {

  const { work } = props;
  
  if (!work) return null;

  return (
    <>
      <List
        dense
        disablePadding
        sx={{ width: '100%', bgcolor: 'background.paper' }}
      >
        { getWorkTitleDefinitions(work.title).map((d: DefinitionMatch) => {
          return (
            <ListItem>
              <ListItemText
                primary={d.match}
                secondary={d.definition}
                primaryTypographyProps={{
                  fontStyle: 'italic',
                }}
              />
            </ListItem>
          );
        }) }
      </List>
    </>
  );
};
