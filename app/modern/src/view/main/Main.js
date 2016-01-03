Ext.define('BB8.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.MessageBox',

        'BB8.view.main.MainController',
        'BB8.view.main.MainModel'
    ],

    controller: 'main',
    viewModel: 'main',

    html: "MOBILE"
});
