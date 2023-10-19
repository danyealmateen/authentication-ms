// make-output-object.ts

import { format } from 'date-fns';

export default function makeOutputObject() {
  function transformData(data: any) {
    return {
      ...data,
      created: formatDate(data.created),
      modified: formatDate(data.modified),
    };
  }

  function formatDate(timestamp: number) {
    // Formatet 'yyyy-MM-dd HH:mm:ss' kommer att producera datum som '2023-10-19 14:30:55'
    // Du kan ändra detta format beroende på dina specifika behov
    return format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss');
  }

  return Object.freeze({
    transformData,
  });
}
