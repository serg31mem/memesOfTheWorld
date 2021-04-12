import * as React from "react";
import s from '../Paginator/Paginator.module.css'
import {useState} from "react";
import cn from "classnames"
import Button from "@material-ui/core/Button";

const Paginator = ({portionSize = 10, ...props}) => {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return <div className={s.paginator}>
        <div>
            {portionNumber > 1 &&
            <Button type="submit"
                    size="small"
                    onClick={() => {
                        setPortionNumber(portionNumber - 1)
                    }}
                    variant="contained"
                    color="primary"
                    className={s.buttonPrev}>PREV</Button>}

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span className={cn({
                        [s.selectedPage]: props.currentPage === p
                    }, s.pageNumber)}
                                 key={p}
                                 onClick={() => {
                                     props.onPageChanged(p)
                                 }}>{p}</span>
                })}
            {portionCount > portionNumber &&
            <Button type="submit"
                    size="small"
                    onClick={() => {
                        setPortionNumber(portionNumber + 1)
                    }}
                    variant="contained"
                    color="primary"
                    className={s.buttonNext}>NEXT</Button>}
        </div>

    </div>

}


export default Paginator