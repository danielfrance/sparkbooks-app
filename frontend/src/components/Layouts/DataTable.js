import { useState } from 'react'
import { Grommet, Box, DataTable, Card, CardHeader, CardBody } from 'grommet'
import { Blank } from 'grommet-icons'

const SortableIcon = () => (
    <Blank color="text-xweak" opacity="0.3">
        <g fill="none" stroke="#000" strokeWidth="2">
            <path d="M 6 10 L 12 6 L 18 10" />
            <path d="M 6 14 L 12 18 L 18 14" />
        </g>
    </Blank>
)

const customTheme = {
    global: {
        font: {
            family: 'Inter',
        },
    },
    dataTable: {
        header: {
            color: 'text-strong',
            extend: ({ column, sort, sortable }) => `
          ${
              sortable &&
              sort &&
              sort.property !== column &&
              `
              :hover {
                svg {
                   opacity: 100%;
                }
               }
            `
          }
         `,
        },
        icons: {
            sortable: SortableIcon,
        },
    },
}

export default function Table({
    title,
    columns,
    data,
    setSelected,
    onClickRow,
    actions = [],
}) {
    const [sort, setSort] = useState({
        property: 'name',
        direction: 'desc',
    })
    return (
        <Card pad="medium" gap="small" className="card">
            <CardHeader>
                <span className="title">{title}</span>
                <div className="actions">
                    {actions.map(action => (
                        <button
                            className="btn secondary inverse small"
                            key={`${title}${action.label}`}
                            onClick={e => action.onClick(e)}>
                            {action.label}
                        </button>
                    ))}
                </div>
            </CardHeader>
            <CardBody>
                <Grommet theme={customTheme}>
                    <Box>
                        <DataTable
                            className="ff-sans-serif fs-300"
                            background={{
                                body: '#FBFBFB',
                            }}
                            border={{
                                header: {
                                    color: '#FBFBFB',
                                    side: 'bottom',
                                },
                                body: {
                                    color: '#FFFFFF',
                                    size: 'small',
                                    side: 'top',
                                },
                            }}
                            step={10}
                            paginate
                            alignSelf="stretch"
                            gap="small"
                            sort={sort}
                            onSort={setSort}
                            columns={columns}
                            onClickRow={onClickRow}
                            setSelected={setSelected}
                            data={data}
                        />
                    </Box>
                </Grommet>
            </CardBody>
        </Card>
    )
}
