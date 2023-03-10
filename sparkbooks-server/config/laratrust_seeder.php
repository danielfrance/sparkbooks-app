<?php

return [
    /**
     * Control if the seeder should create a user per role while seeding the data.
     */
    'create_users' => false,

    /**
     * Control if all the laratrust tables should be truncated before running the seeder.
     */
    'truncate_tables' => true,

    'roles_structure' => [
        'superadmin' => [
            'users' => 'c,r,u,d',
            'invite' => 'c,r,u,d',
            'profile' => 'r,u',
            'accounts' => 'c,r,u,d',
            'subsciptions' => 'c,r,u,d',
            'workspaces' => 'c,r,u,d',
            'billing' => 'c,r,u,d',
            'plans' => 'c,r,u,d',
            'subscriptions' => 'c,r,u,d',
            'upload' => 'c,r,u,d',
            'process' => 'c,r,u,d',
            'results' => 'c,r,u,d',
            'exports' => 'c,r,u,d',
            'clients' => 'c,r,u,d',
            'impersonate' => 'c,r',
            'super-admin' => 'c,r,u'
        ],
        'admin' => [
            'users' => 'c,r,u,d',
            'invite' => 'c,r,u,d',
            'profile' => 'r,u',
            'workspace' => 'r,u,d',
            'billing' => 'c,r,u',
            'subscriptions' => 'c,r,u',
            'upload' => 'c,r,u,d',
            'process' => 'c,r,u,d',
            'results' => 'c,r,u,d',
            'exports' => 'c,r,u,d',
            'clients' => 'c,r,u,d',
        ],
        'editor' => [
            'profile' => 'r,u',
            'workspace' => 'r',
            'upload' => 'c,r,u,d',
            'process' => 'c,r,u,d',
            'results' => 'c,r,u,d',
            'exports' => 'c,r,u,d',
            'clients' => 'c,r,u,d',
        ],

    ],

    'permissions_map' => [
        'c' => 'create',
        'r' => 'read',
        'u' => 'update',
        'd' => 'delete'
    ]
];
