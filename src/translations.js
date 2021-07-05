import { initTranslations, setLanguage } from '@sangre-fp/i18n'
setLanguage(document.querySelector('html').getAttribute('lang'))

const localTranslations = {
  top5Voted_RadarConclusions: {
      en: 'Top 5 voted content ',
      fi: 'Top 5 -äänestetyt'
  },
  top5Rated_RadarConclusions: {
    en: 'Top 5 rated content ',
    fi: 'Top 5 -arvioidut'
  },
  HideTitles_RadarConclusions: {
    en: 'Hide titles ',
    fi: 'Piilota otsikot'
  },    
  ShowResultsAs_RadarConclusions: {
    en: 'Show results as: ',
    fi: 'Näytä tulokset muodossa: '
  },
  Average_RadarConclusions: {
    en: 'Average ',
    fi: 'Keskiverto'
  },
  Median_RadarConclusions: {
    en: 'Median',
    fi: 'Mediaani'
  },

}

initTranslations(localTranslations);
