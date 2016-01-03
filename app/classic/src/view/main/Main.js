
Ext.define('BB8.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'BB8.view.main.MainController',
        'BB8.view.main.MainModel',
        'Ext.ux.colorpick.Field',
        'Ext.slider.Single'
    ],

    controller: 'main',
    viewModel: 'main',

    layout: 'border',

    items: [{
      title: 'Logger',
      flex: 1,
      region: 'south',
      layout: 'fit',
      items: [{
        xtype: 'textareafield',
        name: 'logger'
      }],
      bodyPadding: 10
    },
    {
      xtype: 'toolbar',
      region: 'north',
      items: [
      {
        text: 'A'
      },
      {
        text: 'D'
      },
      {
        text: 'W'
      },
      {
        text: 'S'
      },
      {
        xtype: 'colorfield',
        value: '#ff0000'
      },
      '->',
      {
        text: 'Connect'
      }, {
        text: 'Disconnect'
      }]
    },
    {
      title: "Controls",
      region: 'center',
      layout: {
        type: 'hbox',
        align: 'center',
        pack: 'stretch'
      },
      items: [
      {
        xtype: 'slider',
        flex: 1,
        height: 200,
        vertical: true,
        increment: 1,
        value: 50,
        minValue: 0,
        maxValue: 100,
        margin: '0 100'
      },
      {
        xtype: 'slider',
        flex: 1,
        height: 200,
        increment: 1,
        value: 50,
        minValue: 0,
        maxValue: 100,
        margin: '0 100'
      }]
    }]
});
