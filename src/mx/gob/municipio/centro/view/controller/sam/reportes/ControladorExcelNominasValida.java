package mx.gob.municipio.centro.view.controller.sam.reportes;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import mx.gob.municipio.centro.model.gateways.sam.GatewayExcelReporteNomina;
import mx.gob.municipio.centro.model.gateways.sam.GatewayReporteNominaValida;
import mx.gob.municipio.centro.view.bases.ControladorBase;
import mx.gob.municipio.centro.view.controller.sam.facturas.ListaNomina;

@Controller
@RequestMapping("/sam/facturas/lst_reporteexcelNomina.action")
public class ControladorExcelNominasValida extends ControladorBase{

	private static Logger log = Logger.getLogger(ControladorExcelNominasValida.class.getName());
	public final static  int VER_TODAS_LAS_UNIDADES = 25;
	
	@Autowired
	GatewayReporteNominaValida gatewayReporteNominaValida;
	
	public ControladorExcelNominasValida(){		
	}
	
	
	@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})  
	public ModelAndView requestGetControlador(Map modelo, HttpServletRequest request, HttpServletResponse response) {
		
		gatewayReporteNominaValida.cargarInformacion(modelo);
		
		return new ModelAndView(new GatewayExcelReporteNomina(),"modelo", modelo);
		
	}
}
