import { FormControl } from '@angular/forms';

export interface ProjectColumnConfig {
    id: string;
    name: string;
    placeholder: string;
    filterControl: FormControl;
}
export const TASK_CONFIG_COLUMNS: Array<{id: string, label: string, type?: string, displayedId?: string}> = [
    {
      id: 'location',
      label: 'Task Area/Location',
    },
    {
      id: 'activityLabel',
      label: 'Activity',
    },
    {
      id: 'name',
      label: 'SubTask',
    },
    {
      id: 'duration',
      label: 'Estimated Duration',
    },
    {
      id: 'approver',
      label: 'Approver',
      type: 'object',
      displayedId: 'name'
    },
    {
      id: 'approverAction',
      label: 'Approver Action',
    },
    {
      id: 'approverComments',
      label: 'Approver Comments',
    },
    {
      id: 'volunteers',
      label: 'volunteers',
      type: 'array',
      displayedId: 'name'
    },
    {
      id: 'volunteersComments',
      label: 'Volunteers Comments',
    },
    {
      id: 'upload',
      label: 'Upload',
      type: 'link',
    },
    {
      id: 'timeEntered',
      label: 'Time Entered',
    }
];

export const PROJECT_COLUMN_CONFIG: Array<ProjectColumnConfig>  = [
    {
      id: 'name',
      name: 'Project Name',
      filterControl: new FormControl(null),
      placeholder: 'Project Filter'

    },
    {
      id: 'areaOfEngagement',
      name: 'Area of Engagement',
      filterControl: new FormControl(null),
      placeholder: 'Area Filter'

    },
    {
      id: 'location',
      name: 'Task Area/Location',
      filterControl: new FormControl(null),
      placeholder: 'Location Filter'

    },
    {
      id: 'duration',
      name: 'Duration',
      filterControl: new FormControl(null),
      placeholder: 'Duraration Filter'

    },
    {
      id: 'status',
      name: 'Status',
      filterControl: new FormControl(null),
      placeholder: 'Status Filter'
    },

  ];