import React, { Dispatch, SetStateAction, PropsWithChildren, useMemo, ReactElement, useState } from 'react';
import * as _ from 'lodash';
import Search from 'bootstrap-icons/icons/search.svg'
import { Card } from 'react-bootstrap';
import JSONPretty from 'react-json-pretty';
import theme from './pretty.json';

export const FilterIcon = ({ show, currentFilter, setSearchToggled, className = '', ...props }: PropsWithChildren<{ show: boolean, currentFilter: Object, setSearchToggled: Dispatch<SetStateAction<boolean>>, className?: string }>) => {
  if(!show)
    return null;

  const [showTooltip, setShowTooltip] = useState(false);
  const hasFilter = useMemo(() => {
    return !_.isEmpty(currentFilter);
  }, [currentFilter])

  return (
    <div {...props} className="clickable d-flex mx-2">
      <Search className={`${hasFilter ? 'text-info' : ''}`} onMouseEnter={() => { setShowTooltip(hasFilter) }} onMouseLeave={() => { setShowTooltip(false) }} onClick={() => { setSearchToggled(x => !x) }} />
      <Card body className={`${showTooltip ? '' : 'd-none'} shadow-sm`} id="search-tooltip">
        {hasFilter ? <JSONPretty id="json-pretty" theme={theme} data={currentFilter}></JSONPretty> : null}
      </Card>
    </div>
    )
}